# Generated by Django 4.1.7 on 2023-03-08 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playground_api', '0003_remove_playground_address_review_rating_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playground',
            name='description',
        ),
    ]
