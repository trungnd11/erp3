#!/bin/bash

mongosh <<EOF
use admin;
db.auth("root","root123");
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo:27017",
            "priority": 1
        },
        {
            "_id": 2,
            "host": "mongo-replica:27018",
            "priority": 2
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
rs.secondaryOk();
EOF