#!/bin/bash
if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  docker login repo.treescale.com -u $TREESCALE_USERNAME -p $TREESCALE_PASSWORD &&
  docker build -t repo.treescale.com/colinskeep/ozark-login-api . &&
  docker push repo.treescale.com/colinskeep/ozark-login-api:latest
fi
