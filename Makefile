NAME="example"
PUBLIC_PORT=3000
PORT=${PUBLIC_PORT}
IMAGE_NAME = "grengojbo/${NAME}"
SITE="site.uatv.me"

.PHONY: all run clean push create shell build destroy

all: push

push:
	git push deis master

clean:
	docker rmi ${IMAGE_NAME}

create:
	deis create ${NAME}
	deis domains:add ${SITE} -a ${NAME}
	deis limits:set -m cmd=64M -a ${NAME}

run:
	npm run debug

shell:
	docker run --rm -v /storage/${NAME}:/storage/${NAME} --name ${NAME} -e NAME_APP=${NAME} -i -t -p ${PUBLIC_PORT}:{PORT} ${IMAGE_NAME} /bin/bash

build:
	@docker build -t ${IMAGE_NAME} .

install:
	# docker push grengojbo/sil 10.0.7.235:5000/sil
	fleetctl submit ${NAME}.service
	fleetctl submit ${NAME}-log.service

destroy:
	deis apps:destroy --app=${NAME} --confirm=${NAME}
