# Generated by Django 3.2.9 on 2021-11-28 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PullRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base_branch', models.CharField(max_length=256, verbose_name='your branch (the compare branch)')),
                ('compare_branch', models.CharField(max_length=256, verbose_name="the repository's base branch")),
                ('author', models.CharField(max_length=32)),
                ('title', models.CharField(max_length=32)),
                ('description', models.TextField(blank=True, default='', max_length=2)),
                ('status', models.CharField(choices=[('OP', 'Open'), ('CL', 'Closed'), ('MD', 'Merged')], default='OP', max_length=2)),
            ],
        ),
    ]