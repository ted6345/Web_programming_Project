# Generated by Django 3.0.5 on 2021-02-06 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0005_auto_20210204_0240'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageHistory',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('image', models.CharField(max_length=1000)),
                ('clicker_id', models.CharField(max_length=20)),
                ('clicked_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SearchHistory',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('content', models.CharField(blank=True, max_length=100, null=True)),
                ('searcher_id', models.CharField(max_length=20)),
                ('searched_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Search',
        ),
    ]