#!/bin/bash
INSTANCE_NAME=$(gcloud compute instance-groups list-instances imarket-web-group --zone us-east1-d |grep imarket-web-group | awk '{print $1}')
gcloud compute ssh $INSTANCE_NAME --zone us-east1-d --command /opt/deploy.sh