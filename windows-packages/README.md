
# Postgres Windows Zip (zipped up result of running the installer)

Details covered:

    https://gist.github.com/jctosta/baa4a1ba472a5999f445c0f43fdbe208
    
# Node.js

Fourth Wall project looks to need a newer version than LTS version


So instead of:

    https://nodejs.org/en/download/

which linked through to v16 version at the time of writing, instead
downloaded 64-bit Windows binary via:

    https://nodejs.org/dist/v18.4.0/


# Preparation

After unzipping:

    unzip postgresql-14.4-1-windows-x64-binaries.zip
    unzip node-v18.4.0-win-x64.zip

Run in Cygwin:

    source ./SETUP.bash

Or else in a DOS terminal

    SETUP.bat


Init the DB:

    initdb --pgdata=../data –-username=postgres --pwfile=passwd.txt –-auth=trust --auth-host=password ^
      --encoding="UTF-8" --lc-collate="en_US.UTF-8" --lc-ctype="en_US.UTF-8"


Start the database:


    pg_ctl --pgdata=../data -l logfile.txt start

The default port for Postgres is 5432.  If you want to run Postgres on
a different port, then edit:

    emacs ../data/postgresql.conf

uncomment and change
    # port = 5432


Now create the fourth_wall_cache database, and import the table schemas into it

    psql --username=postgres --password

In the following, because of initdb call, then everything is UTF8 by default

    CREATE DATABASE fourth_wall_cache;

# WITH ENCODING 'UTF8'
# LC_COLLATE='English_United Kingdom' LC_CTYPE='English_United Kingdom';
#       LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8'
    
    \q

    psql --username=postgres --password fourth_wall_cache

# < ..\startup.sql

    \i ../startup.sql;
    \q  




## Other useful commands

Interactive Postgres prompt for SQL commands run within the fourth_wall_cache DB:


    psql --username=postgres --password fourth_wall_cache

Stop the Postgres server:

    pg_ctl --pgdata=../fourth_wall_cache stop
