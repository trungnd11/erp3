ARG MONGO_VERSION

FROM mongo:${MONGO_VERSION}

COPY --chown=999:999 --chmod=400 ./mongo-cluster-key /home/mongo-cluster-key
COPY --chown=999:999 --chmod=400 ./mongod.conf /home/mongod.conf
COPY --chown=999:999 --chmod=777 ./rs-init.sh /home/rs-init.sh
