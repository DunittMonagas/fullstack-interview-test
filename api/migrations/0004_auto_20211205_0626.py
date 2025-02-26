# Generated by Django 3.2.9 on 2021-12-05 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211204_1757'),
    ]

    operations = [
        migrations.AddField(
            model_name='pullrequest',
            name='conflict',
            field=models.BooleanField(default=False, verbose_name='There are conflicts to be resolved.'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='conflict_description',
            field=models.TextField(blank=True, default='', max_length=256),
        ),
    ]
