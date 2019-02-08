# GiphyApp
  A Web App for GIFs!

Notes to grader:
  First and foremost, I would like to thank you for reviewing my code. I am sure that reviewing the same 
  app can get tedious. I hope that you enjoy this app, but more importantly, regardless of the result, I would love
  to hear feedback on how to improve (if permissible by HEB, of course).
  
  Here is a brief walkthrough of my code::
  
  #####/GiphyApp/static/javascript: 
  This contains all of my front-end code. Most of the interactions being done are via AJAX, so most of my logic is here.
  
  #####/GiphyApp/views.py: 
  This is my backend code. It is very minimal. It really only enforces logins, and talks to the DB for the front-end.
  
  #####/GiphyApp/urls.py: 
  The routing table.
  
  #####/GiphyApp/settings: 
  All of my integrations and Django-specific settings. This is separated by environment - local and integration.
  
  #####/GiphyApp/models: 
  My one model that I had to create for GIF storage.

### Instructions
  I have deployed this project in AWS: http://giphyapp-integration.mg7gqvisev.us-west-2.elasticbeanstalk.com/
  
  Login with the following user:
  U/N: jcomish@sourceiron.com
  P/W: Test@1234!
  
  Additionally, you may run this locally by navigating to the root directory and running:
  pip install -r requirements.txt
  python manage.py runserver
  
  NOTE: If you do choose to run locally, you will need to do the following:
  - Set up a local Postgres Database.
  - Run python manage.py makemigrations
  - Run python manage.py migrate
  - Run python manage.py creatsu
  - Set up environment variables as referenced under the "Environment Variables" section below.

  I am going to outline major points of interest where I made decisions to simplify the app.

### Django
  The first thing that came to my mind when I read the requirements was that I should to do this in Django. I could have
  used other technologies, but Django comes packed with a lot of the features that are being requested (namely
  user management)

### User Management
  I know that I could have just made a basic form that signs up a user with little to no exception and meet requirements,
  but doing so would not be secure at all and the UX would be terrible. Fortunately, Django makes it easy to manage
  users, which is why I picked it for my framework. My thought was that it would take roughly the same amount of time
  to implement a barebones user management system as it would to use  an extension called "django-allauth". This
  extension permitted me to implement a more complete user management system, including email notifications, tokens, 
  password complexity, and a high degree of configurability.
  
  NOTE: The signin process requires you to enter an email, and that email must be on the approved list since it is non-production.
  If you would like to test this yourself, send me an email at jomish2323@gmail.com and I will send you a temporary invite.
  
  You will notice that the templates directory has an account subdirectory. These are the allauth templates from the
  github repo. In order to style these templates, you need to pull them into your repo. That is why these templates
  are in the repo.
  
  Upon implementing AllAuth, I noticed that it does not appear to be working with Django 2.x. This is definitely a 
  problem, but I am hoping this is user error. This is not preferrable, but since it is a tool that I am familiar with, 
  I will proceed. I would do research later on with more time and either fix or iterate away from it.

### Bootstrap 
  I consider front-end development to be my biggest shortcoming when it comes to web development. Despite this,
  Bootstrap makes it relatively straightforward, so I leaned on it as much as I possibly could. 
  This meets the requirement of a responsive design, although I did not have quite enough time to style the gifs in a 
  more consistent way. 
  
  Since I want to learn front-end development, I chose to lean more into it than my normal backend development. This was
  also good since the site was more responsive with AJAX than rendering pages via Django.

### Cloud Integration
  I love working in the cloud. The first thing I always do when starting a new project is get my dev environment with my 
  integration environment up and running properly in parallel. Since I was the only developer on this assignment, I
  could have just used the same database and file storage, but I always develop with the thought that the project will
  one day have more than one developer on it, so I isolated each environment.

##### Elastic Beanstalk
  I first attempted to deploy a Docker container to ElasticBeanstalk through AWS. I wanted to do this
  to expand my Docker knowledge, as I have never deployed a docker image to AWS nor have I worked in Docker with
  Django. I was able to get my Docker image working properly locally, but I had trouble on the AWS side hooking up
  the networking, so I decided to ditch Docker and come back to it later if I had time, since I have a lot of experience
  deploying Python applications to Elastic Beanstalk. 

##### Environment Variables
  The environment variables for sensitive variables are stored within Elastic Beanstalk. Note that if you run locally, 
  you WILL need to include these when you attempt to run. I have documented this below as a reference
  
  | Variable                | Use                                |
  | ------------------------|:----------------------------------:|
  | ALLOWED_HOSTS           | Hosts allowed to be served         |
  | AWS_ACCESS_KEY_ID       | IAM Access Key on AWS              |
  | AWS_SECRET_ACCESS_KEY   | IAM Secret Key on AWS              |
  | AWS_STORAGE_BUCKET_NAME | S3 Bucket Name                     |
  | DB_ENDPOINT             | Endpoint for your Postgres DB      |
  | DB_NAME                 | Name of the DB                     |
  | DB_PASSWORD             | Password for the DB User           |
  | DB_USER                 | Username for the DB User           |
  | DJANGO_SETTINGS_MODULE  | Settings module. Use local for dev |
  | EMAIL_HOST_PASSWORD     | AWS SES Password                   |
  | EMAIL_HOST_USER         | AWS SES User                       |

  
##### AWS S3
  I set up an S3 bucket for static files, since S3 was designed for quick file storage.

##### AWS RDS
  I setup a minimal Postgres database on RDS to serve as my user storage. RDS is a fully-managed service, so
  this would mean the least amount of maintenance if GiphyApp ever were to be used. Despite being more expensive,
  this tradeoff would  pay for itself very quickly.

##### AWS CodePipeline
  I personally cannot stand manual deployments, so I went ahead and set up a CI environment using
  AWS CodePipeline as well. This simply deploys what is on the integration branch to Elastic Beanstalk
  when it is merged in. I have included migrations and static file collection automatically as part of this deployment.
  These instructions can be found in the django.config file under the .ebextensions directory

##### AWS SES
  Since user registration relies heavily on emails, I went ahead and hooked up AWS SES to server as my SMTP server.
  NOTE: In order for SES to work with any email, a request needs to be procesed by AWS. For the sake of this sample, I 
  skipped this, so emails will only be sent to specific email addresses. If you would like to test this out, please
  give me an email and I will add it to the list of approved emails.

### Next Steps
  I am interpreting the intent of this project similarly to most of my side projects. That is, if this were to persist in a 
  production environment, the most important attribute to this project would be its maintainability. Minimizing the
  commitment required by this project would open my time to do other things. Given more time, I would do the following
  to improve this attribute.

  - Write integration tests using Selenium and hook it up to the CI pipeline. This would significantly decrease 
    the amount of work that needs to be done to maintain the project if it were to continue.

  - Write Unit Tests. There isn't very much backend code here, and it was all SUPER straightforward. I figure that
    testing the UI would be more worthwhile.

  - Finish my Docker integration so that this can be easily deployed to other environments if necessary, 
    decreasing the amount of technical debt of the project.

  - Create a Production environment, and setup the CodePipeline to have everything ready, but wait for my instruction
    to perform the deployment to PROD. (If I felt particularly comfortable with my integration tests, I could just make
    this full-blown CD and deploy straight to PROD.)

  - Set up the cloud resources to automatically scale with demand after doing research into usage and server load.

  - If necessary, set up an environment manually as opposed to using Elastic Beanstalk, as I have found it is more 
    rigid than it should be for production environments.

  Additionally, I would:
  - Make the GIFs look better when they show up on the page.
  
  - Finish styling all of the allauth forms (depending on the integration results)
  
  - Open up SES to all emails
  
  - Do some user research to evaluate my UX.
  
  - Get a tester's input to find any bugs I missed; Tunnel vision kills projects!
  
  - If the Giphy API were ever to go down, I would want my service to persist, so I would set up the save feature to 
    actually save the GIFs to the S3 bucket as opposed to just storing the link.
