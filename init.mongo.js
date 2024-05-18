db.createUser({
    user: "root",
    pwd: "example",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "dbAdminAnyDatabase", db: "admin" }
    ]
});

db = db.getSiblingDB('database_rbr');