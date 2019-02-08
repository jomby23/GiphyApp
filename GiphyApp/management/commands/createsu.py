from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

# This is just a command I use whenever I am running a Django project. You would not believe
# how much easier this makes deployments to lower environments!
class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "jcomish@sourceiron.com", "Test@1234!")
            self.stdout.write(self.style.SUCCESS('Successfully created new super user'))
