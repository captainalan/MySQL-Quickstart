# Getting Started with MySQL

## Setup

Download and install and install the [MySQL Community
Edition](https://dev.mysql.com/downloads/mysql/) server. 

I kept all the default options.

### Optional: MySQLWorkbench

For a nice GUI tool, download and install
[MySQL Workbench](https://www.mysql.com/products/workbench/).

### Command Line Tools

**Note:** These instructions assume you are using a UNIX based system (including
MacOS).

You may have to edit your `$PATH` environmental variable. Check what this is by
running:

```bash
echo $PATH
```

I added this line to my `.zshrc` file (I use `zsh`). If you use bash, you could
add the same line to your `.bashrc` file.

```bash
# path for MySQL
export PATH="/usr/local/mysql/bin:$PATH"
```

## Making a new user, database, and table

Run `mysql -u root -p` to log in to a MySQL shell as root. You will be prompted
for your password which you set during installation.

The following command will create a user `bar` with password `baz` on
`localhost`.

```sql
CREATE USER 'bar'@'localhost' IDENTIFIED BY 'baz';
```
Now, let's make a new database. The two commands below should be pretty 
self-explanatory.

```sql
CREATE DATABASE foo_db;
USE foo_db;
```

We will then give our new user all permissions to this particular database.

```sql
GRANT ALL PRIVILENGES ON foo_db.* TO 'bar'@'localhost';
```

Now, let's login and try to log in as our new user, `bar`. Type `\q` at the
`mysql>` prompt to quit. Then from your normal shell (e.g. bash), do:

```sql
mysql -u bar -p foo_db
```

You will then be prompted for your password (if you have been following this
tutorial, then that is `baz`). Type `show tables;` at the `mysql>` prompt. 

MySQL should return "Empty set", because you do not have any table(s) yet.

Let's change that. Run the following:

```sql
CREATE TABLE drinks (id INTEGER PRIMARY KEY, name VARCHAR(32), note VARCHAR(64)); 
```

Now try `show tables;` again. You should get something like this:

    +------------------+
    | Tables_in_foo_db |
    +------------------+
    | drinks           |
    +------------------+
    1 row in set (0.00 sec)

Wonderful! Now let's add a couple of items to this table.

```sql
INSERT INTO drinks(id, name, note)
VALUES(1, "water", "essential for life"),
      (2, "coffee", "now u r woke"),
      (3, "kombucha", "what are you? a hipster?!");
```

Now, (from the `mysql>` prompt) run `SELECT * FROM drinks;`. This should give
you output something like this:

    +----+----------+---------------------------+
    | id | name     | note                      |
    +----+----------+---------------------------+
    |  1 | water    | essential for life        |
    |  2 | coffee   | now u r woke              |
    |  3 | kombucha | what are you? a hipster?! |
    +----+----------+---------------------------+
    3 rows in set (0.00 sec)

## Doing stuff from Node

(Insert Node/npm install things)

Now that we have a user, a database, and a table we can start doing stuff these
things with JavaScript via Node. Let's write some Node code to query our
database. Create a file `index.js` with the following code:

```JavaScript
var mysql = require('mysql');
var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'bar',
  password  : 'baz',
  database  : 'foo_db',
  port      : 3306
});

connection.connect();

connection.query('SELECT * FROM drinks', (error, results, fields) => {
  if (error) throw error;
  console.log('My data: ' + JSON.stringify(results));
});

connection.end()
```

Now, from the directory where you saved this file, run `node index.js`.

Assuming you've been following all of the previous steps, you should get output
something like this:

> My data: [{"id":1,"name":"water","note":"essential for life"},{"id":2,"name":"coffee","note":"now u r woke"},{"id":3,"name":"kombucha","note":"what are you? a hipster?!"}]


### `ER_NOT_SUPPORTED_AUTH_MODE`

Got this ^ error? 
Thanks, 
[stack overflow](https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server) for this fix:

```sql
ALTER USER 'bar'@'localhost' IDENTIFIED WITH mysql_native_password BY 'baz';
```


## Doing stuff from Python 

We are now going to interact with the same database we just interacted with from
Node using Python now. Not only is this fun (it is, right? :D) it demonstrates 
how a MySQL server might be connected to from many different programs using
different languages. 

## Multiple Connections

(Open multiple connections at once...) 

We will now open MySQL workbench to see all the active connections.

You can see a list of supported languages 
[here](https://dev.mysql.com/doc/refman/8.0/en/connectors-apis.html).


