const express = require('express');
const passport = require('passport');
const router  = express.Router();
const User = require('../models/user');
const lecturerController = require('../controllers/lecturersController');
const eventController = require('../controllers/eventController');
const newsController = require('../controllers/newsController');

// Middleware to protect dashboard routes
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};


router.get('/', async (req,res)=>{
  try {
    // fetch data from db
const events = await eventController.getRecentEvents();
const news = await newsController.getRecentNews();
res.render('websites/index', { events, news })
  } catch (error) {
    
  } 
})

router.get('/events', (req, res) => {
  res.render('websites/events');
});

router.get('/events-details/:id', async(req, res) => {
  try {
    const event = await eventController.getEventById(req, res);
    res.render('websites/events-details', {event});
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Events' });
  }
  
});

router.get('/news-details/:id', async(req, res) => {
  try {
    const news = await newsController.getNewsById(req, res);
    const rnews = await newsController.getRecentNews();
  res.render('websites/news-details', {news, rnews});
   // res.render('websites/news-details');

  } catch (error) {
    res.status(500).json({ error: 'Failed to get News Details' });
  }
  
});

router.get('/news', (req, res) => {
  res.render('websites/news');
});

router.get('/news-details', (req, res) => {
  res.render('websites/news-details');
});


router.get('/accounting-department',(req,res)=>{
    res.render('websites/accounting_department')
    
})

router.get('/under-graduate-programmes',(req,res)=>{
  res.render('websites/undergraduate_progs')
  
})

router.get('/post-graduate-programmes',(req,res)=>{
  res.render('websites/postgraduate_progs')
  
})
router.get('/bamis-department',(req,res)=>{
    res.render('websites/bamis_department')
    
})
router.get('/finance-department',(req,res)=>{
    res.render('websites/finance_department')
    
})
router.get('/hrod-department',(req,res)=>{
    res.render('websites/hrod')
    
})
router.get('/marketing-and-enterpreneurship-dept',(req,res)=>{
    res.render('websites/marketing_and_enterpreneurship_dept')
    
})
router.get('/pahsa-department',(req,res)=>{
    res.render('websites/pahsa_department')
    
})
router.get('/pscm-department',(req,res)=>{
    res.render('websites/pscm')
    
})
router.get('/faculty',async (req,res)=>{
  try {
    const lecturers = await lecturerController.getAllLecturers();
    res.render('websites/hod', {lecturers}) 
  } catch (error) {
    
  }
    
})
router.get('/administrative-staff',(req,res)=>{
  res.render('websites/administrative_staff')
  
})
router.get('/mission-vision',(req,res)=>{
  res.render('websites/vission-mission') 
})
router.get('/about-us',(req,res)=>{
    res.render('websites/about-us') 
})



router.get('/contact-us', (req, res) => {
  res.render('websites/contact-us');
});

//admin pages
router.get('/create-lecturer-profile',ensureAuthenticated,(req,res)=>{
    res.render('dashboard/pages/add-lecturer')  
})

router.get('/update-lecturer-profile/:id',ensureAuthenticated,async (req,res)=>{
  try {
    const lecturer = await lecturerController.getLecturerById(req,res);
    res.render('dashboard/pages/update-lecturer', {lecturer})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lecturer' });
  } 
})

// update event route
router.get('/update-event/:id',ensureAuthenticated,async (req,res)=>{
  try {
    const event = await eventController.getEventById(req,res);
    res.render('dashboard/pages/update-event', {event})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get event' });
  } 
})


// update news route
router.get('/update-news/:id',ensureAuthenticated,async (req,res)=>{
  try {
    const news = await newsController.getNewsById(req,res);
    res.render('dashboard/pages/update-news', {news})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get news' });
  } 
})

router.get('/signin',(req,res)=>{
    res.render('dashboard/pages/signin')
    
})
router.get('/signup',(req,res)=>{
    res.render('dashboard/pages/signup')
    
})

router.get('/add-news', ensureAuthenticated, (req,res)=>{
  res.render('dashboard/pages/add-news')
  
})

router.get('/add-event',ensureAuthenticated,(req,res)=>{
  res.render('dashboard/pages/add-event')
  
})

router.get('/news-list', ensureAuthenticated,async (req,res)=>{
try {
  const news = await newsController.getAllNews();
  res.render('dashboard/pages/news-list', {news})
} catch (error) {
  
}
  
})


/*CRUD for Lecturer */
// Create a new lecturer
router.post('/lecturers', async (req,res)=>{
  try {
    const lecturer = await lecturerController.createLecturer(req,res);
    console.log(lecturer);
    res.status(200);
    res.redirect('/event-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
});

// Create a new events
router.post('/events', async (req,res)=>{
  try {
    const event = await eventController.createEvent(req,res);
    console.log(event);
    res.status(200);
    res.redirect('/lecturers-profile-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
});

// Create a new news
router.post('/news', async (req,res)=>{
  try {
    const news = await newsController.createNews(req,res);
    res.status(200);
    res.redirect('/news-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
});

// Get all lecturers
router.get('/lecturers-profile-list', ensureAuthenticated,async (req,res)=>{
  try {
    const lecturers = await lecturerController.getAllLecturers();
    res.render('dashboard/pages/lecturers-profile-list', {lecturers})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lecturers' });
  } 
})

// Get all Events
router.get('/event-list', ensureAuthenticated,async (req,res)=>{
  try {
    const events = await eventController.getAllEvents();
    res.render('dashboard/pages/event-list', {events})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lecturers' });
  } 
})

// Get a specific lecturer by ID
router.get('/lecturer-profile/:id',ensureAuthenticated,async (req,res)=>{
  //console.log(req.params.id)
  try {
    const lecturer = await lecturerController.getLecturerById(req,res);
    res.render('dashboard/pages/lecturer-profile', {lecturer})
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lecturer' });
  }   
})

// Update a lecturer by ID
router.put('/lecturers/:id', async(req, res) => {
  try {
   await lecturerController.updateLecturerById(req, res);
   res.status(200).json({ message: 'Lecturer deleted successfully' });
  // res.render(`/lecturer-profile/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update lecturer' });
  }
});

// Update a Event by ID
router.put('/events/:id', async(req, res) => {
  try {
   const event = await eventController.updateEventById(req, res);
   res.status(200).json({ message: 'Event Updated successfully' });
  // res.render(`/lecturer-profile/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update event' });
  }
});

// Update a News by ID
router.put('/news/:id', async(req, res) => {
  try {
   const news = await newsController.updateNewsById(req, res);
   res.status(200).json({ message: 'News Updated successfully' });
  // res.render(`/lecturer-profile/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update news' });
  }
});
// Delete a lecturer by ID
router.delete('/lecturers/:id', async (req, res)=> {
  try {
    const lecturer = await lecturerController.deleteLecturerById(req, res);
    console.log(lecturer);
    res.status(200).json({ message: 'Lecturer deleted successfully' });
    //res.redirect('/lecturers-profile-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to Delete lecturer' });
  }
});

// Delete an event by ID
router.delete('/events/:id', async (req, res)=> {
  try {
    const event = await eventController.deleteEventById(req, res);
    console.log(event);
    res.status(200).json({ message: 'event deleted successfully' });
    //res.redirect('/lecturers-profile-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to Delete event' });
  }
});

// Delete a news by ID
router.delete('/news/:id', async (req, res)=> {
  try {
    const news = await newsController.deleteNewsById(req, res);
    console.log(news);
    res.status(200).json({ message: 'newsitem deleted successfully' });
    //res.redirect('/lecturers-profile-list');
  } catch (error) {
    res.status(500).json({ error: 'Failed to Delete news' });
  }
});

/*End CRUD for Lecturer */

// handle signup
router.post('/signup', async (req, res) => {
  let bdy = req.body;
  try {
    const { firstName, lastName, email, contact, role, password, pic } = req.body;
    const user = new User({ firstName, lastName, email, contact, role, password, pic });
    await user.save();
     // Redirect to the login page after successful registration
    res.redirect('/signin');
  } catch (error) {
    res.status(500).json({ error: bdy });
  }
});

// handle login

router.post('/login', passport.authenticate('local', {
  successRedirect: '/create-lecturer-profile',
  failureRedirect: '/signin',
}));

// handle logout 
router.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/'); // Redirect to home page after logging out
});

// admin routes ends here

router.get("/bsc-accounting", (req, res) => {
  res.render("websites/course_details/accounting/bsc_accounting");
});
router.get("/mba-accounting", (req, res) => {
  res.render("websites/course_details/accounting/mba_accounting");
});
router.get("/msc-accounting", (req, res) => {
  res.render("websites/course_details/accounting/msc_accounting");
});
router.get("/mphil-accounting", (req, res) => {
  res.render("websites/course_details/accounting/mphil_accounting");
});
router.get("/phd-business-administration", (req, res) => {
  res.render("websites/course_details/accounting/phd_business_administration");
});

router.get("/bsc-business-information", (req, res) => {
  res.render("websites/course_details/bamis/bsc-business-information");
});
router.get("/mba-management-information", (req, res) => {
  res.render("websites/course_details/bamis/mba-management-information");
});
router.get("/mphil-management-information", (req, res) => {
  res.render("websites/course_details/bamis/mphil-management-information");
});
router.get("/phd-management-information", (req, res) => {
  res.render("websites/course_details/bamis/phd-management-information");
});



router.get("/bsc-banking-and-finance", (req, res) => {
  res.render("websites/course_details/finance/bsc-banking-and-finance");
});
router.get("/bsc-finance-and-economics", (req, res) => {
  res.render("websites/course_details/finance/bsc-finance-and-economics");
});

router.get("/mba-finance", (req, res) => {
  res.render("websites/course_details/finance/mba-finance");
});
router.get("/mphil-finance", (req, res) => {
  res.render("websites/course_details/finance/mphil-finance");
});
router.get("/msc-development-finance", (req, res) => {
  res.render("websites/course_details/finance/msc-development-finance");
});
router.get("/phd-business-administration-finance", (req, res) => {
  res.render(
    "websites/course_details/finance/phd-business-administration-finance"
  );
});
router.get("/phd-development-finance", (req, res) => {
  res.render("websites/course_details/finance/phd-development-finance");
});



router.get("/bsc-human-resource-management", (req, res) => {
  res.render("websites/course_details/hrod/bsc-human-resource-management");
});

router.get("/mba-human-resource", (req, res) => {
  res.render("websites/course_details/hrod/mba-human-resource");
});

router.get("/mphil-human-resource-mgt", (req, res) => {
  res.render("websites/course_details/hrod/mphil-human-resource-mgt");
});

router.get("/msc-leadership-and-org-dev", (req, res) => {
  res.render("websites/course_details/hrod/msc-leadership-and-org-dev");
});

router.get("/phd-business-admin-human-res-mgt", (req, res) => {
  res.render("websites/course_details/hrod/phd-business-admin-human-res-mgt");
});





router.get("/bsc-marketing", (req, res) => {
  res.render("websites/course_details/dep-marketing-and-ent/bsc-marketing");
});


router.get("/mba-marketing", (req, res) => {
  res.render("websites/course_details/dep-marketing-and-ent/mba-marketing");
});


router.get("/mphil-enterpreneurship-and-innovation", (req, res) => {
  res.render(
    "websites/course_details/dep-marketing-and-ent/mphil-enterpreneurship-and-innovation"
  );
});


router.get("/msc-enterpreneurship-and-innovation", (req, res) => {
  res.render(
    "websites/course_details/dep-marketing-and-ent/msc-enterpreneurship-and-innovation"
  );
});

router.get("/phd-business-admin-enterpreneurship-and-inno", (req, res) => {
  res.render(
    "websites/course_details/dep-marketing-and-ent/phd-business-admin-enterpreneurship-and-inno"
  );
});


router.get("/master-of-public-administration", (req, res) => {
  res.render(
    "websites/course_details/pahsa/master-of-public-administration"
  );
});

router.get("/mba-health-service-administration", (req, res) => {
  res.render("websites/course_details/pahsa/mba-health-service-administration");
});



router.get("/bsc-procurement-and-supply-chain", (req, res) => {
  res.render("websites/course_details/pscm/bsc-procurement-and-supply-chain");
});

router.get("/mba-procurement-and-supply-chain", (req, res) => {
  res.render("websites/course_details/pscm/mba-procurement-and-supply-chain");
});
router.get("/msc-procurement-and-supply-chain", (req, res) => {
  res.render("websites/course_details/pscm/msc-procurement-and-supply-chain");
});






module.exports = router;
