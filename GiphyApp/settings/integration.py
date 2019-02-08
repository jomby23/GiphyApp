from .base import *
import os

env = os.environ.get

DEBUG = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
DEFAULT_FILE_STORAGE = 'storages.backends.s3.S3Storage'

ADMIN_MEDIA_PREFIX = '/static/admin/'
STATIC_ROOT = 'static'
STATIC_URL = '/static/'

# Account Registration
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
