# Generated by Django 4.1.7 on 2023-03-09 21:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('playground_api', '0005_playground_place_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playground',
            name='place_id',
            field=models.TextField(default=uuid.UUID('6fb82101-b8a7-4cb9-8b3f-ca2b3564e2a9')),
        ),
    ]
