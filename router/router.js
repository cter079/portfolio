import { Router } from 'express';
import { Item } from '../db/db.js';
import cors from 'cors';

const router = Router();

router.use(cors({origin:true,credentials: true}));


router.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST,, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Max-Age", "1800")


  if (req.headers.accept === 'application/json' || req.headers.accept === 'application/x-www-form-urlencoded') {
    next();
    return;
  }
  res.status(406).send({ error: 'Not Acceptable' });
})


router.options('/projects', (req, res) => {
  const allowedMethods = "GET, POST, OPTIONS";

  res.setHeader("Access-Control-Allow-Origin", "http://145.24.222.58:8000")
  res.setHeader("Allow", allowedMethods)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", allowedMethods)

  res.send(204);
})
router.options('/projects/:id', (req, res) => {
  const allowedMethods = "GET, POST, OPTIONS";

  res.setHeader("Access-Control-Allow-Origin", "http://145.24.222.58:8000")
  res.setHeader("Allow", allowedMethods)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", allowedMethods)

  res.send(204);
})


router.get('/projects', cors({
  origin: "*",
  methods: "GET, POST, OPTIONS",
  allowedHeaders: ["Content-Type", "Accept"],
}), (req, res) => {


  const page = parseInt(req.query.start) || 1;
  const limit = req.query.limit ?? null;
  const skip = (page - 1) * limit;



  Item.count().exec((err, count) => {
    Item.find()
      .skip(skip)
      .limit(limit)
      .exec((err, items) => {

      if (err) {
        res.status(500).send(err);
      } else {
        const maxPages = Math.ceil(count / limit);
        

        res.json({
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
            projectlink: item.projectlink,
            _links: {
              self: {
                href: `http://145.24.222.58:8000/api/todos/${item._id}`
              },
              collection: {
                href: `http://145.24.222.58:8000/api/todos`
              }
            }
          }))
          ,
          _links: {
            self: {
              href: `http://145.24.222.58:8000/api/todos/`
            }
          },
          pagination: {
            currentPage: page,
            currentItems: limit ?? count,
            totalPages: Math.ceil(count / limit) ?? 1,
            totalItems: count,
            _links: {
              first: {
                page: 1,
                href: `http://145.24.222.58:8000/api/todos?start=1&limit=${limit}`
              },
              last: {
                page: maxPages,
                href: `http://145.24.222.58:8000/api/todos?start=${maxPages}&limit=${limit}`
              },
              previous: {
                page: (page - 1) > 1 ? page - 1 : 1,
                href: `http://145.24.222.58:8000/api/todos/?start=${(page - 1) > 1 ? page - 1 : 1}&limit=${limit ?? 0}`
              },
              next: {
                page: (page + 1) < maxPages ? page + 1 : maxPages,
                href: `http://145.24.222.58:8000/api/todos/?start=${(page + 1) < maxPages ? page + 1 : maxPages}&limit=${limit ?? 0}`
              }
            }
          }
        });
      }
    });
  });
});





router.post('/projects', cors({
  allowedHeaders: ["Content-Type", "Accept"],
}), (req, res) => {

  const item = new Item(req.body);
  if (!item.title) {
    res.status(400).send({ error: 'Title is required' });
    return;
  }
  item.save((err, item) => {
    if (err) {
      res.status(500).send
        (err);
    } else {
      res.status(201).json({
        id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
            projectlink: item.projectlink,
        _links: {
          self: {
            href: `http://145.24.222.58:8000/api/todos/${item._id}`
          },
          collection: {
            href: `http://145.24.222.58:8000/api/todos`
          }
        }

      });
    }
  });
});






router.get('/todos/:id', cors(), (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      res.status(500).send(err);
    } else if (!item) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json({
        id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
       
        _links: {
          self: {
            href: `http://145.24.222.58:8000/api/todos/${item._id}`
          },
          collection: {
            href: `http://145.24.222.58:8000/api/todos`
          }
        }
      });
    }
  });
});




export default router;