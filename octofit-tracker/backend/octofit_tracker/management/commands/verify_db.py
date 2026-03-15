from django.core.management.base import BaseCommand
import pymongo

class Command(BaseCommand):
    help = 'Verify octofit_db collections and show sample documents'

    def handle(self, *args, **options):
        client = pymongo.MongoClient('localhost', 27017)
        db = client['octofit_db']
        collections = db.list_collection_names()
        self.stdout.write(self.style.SUCCESS(f'Collections: {collections}'))
        for col in collections:
            docs = list(db[col].find().limit(2))
            self.stdout.write(self.style.SUCCESS(f'Collection: {col}'))
            for doc in docs:
                self.stdout.write(str(doc))
