# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-02-07 21:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GiphyApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savedgifs',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]