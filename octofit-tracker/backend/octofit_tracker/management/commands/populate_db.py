from django.core.management.base import BaseCommand
from django.conf import settings

import pymongo

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = pymongo.MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()
        self.stdout.write(self.style.SUCCESS('Dropped existing collections'))

        # Create unique index on email for users
        db.users.create_index('email', unique=True)
        self.stdout.write(self.style.SUCCESS('Created unique index on email'))

        # Insert test users
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'marvel'},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': 'marvel'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'dc'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'dc'},
        ]
        db.users.insert_many(users)
        self.stdout.write(self.style.SUCCESS('Inserted test users'))

        # Insert teams
        teams = [
            {'name': 'marvel', 'members': ['ironman@marvel.com', 'cap@marvel.com']},
            {'name': 'dc', 'members': ['wonderwoman@dc.com', 'batman@dc.com']},
        ]
        db.teams.insert_many(teams)
        self.stdout.write(self.style.SUCCESS('Inserted test teams'))

        # Insert activities
        activities = [
            {'user': 'ironman@marvel.com', 'activity': 'run', 'distance': 5},
            {'user': 'batman@dc.com', 'activity': 'cycle', 'distance': 10},
        ]
        db.activities.insert_many(activities)
        self.stdout.write(self.style.SUCCESS('Inserted test activities'))

        # Insert leaderboard
        leaderboard = [
            {'team': 'marvel', 'points': 100},
            {'team': 'dc', 'points': 90},
        ]
        db.leaderboard.insert_many(leaderboard)
        self.stdout.write(self.style.SUCCESS('Inserted test leaderboard'))

        # Insert workouts
        workouts = [
            {'user': 'ironman@marvel.com', 'workout': 'pushups', 'reps': 50},
            {'user': 'wonderwoman@dc.com', 'workout': 'squats', 'reps': 40},
        ]
        db.workouts.insert_many(workouts)
        self.stdout.write(self.style.SUCCESS('Inserted test workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
