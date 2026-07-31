#!/bin/bash

CLUSTER_NAME="web-app-cluster"
ZONE="asia-south1-a"

echo "Checking if cluster exists..."

if gcloud container clusters describe $CLUSTER_NAME --zone $ZONE >/dev/null 2>&1
then
    echo "Cluster already exists."
else
    echo "Creating cluster..."
    gcloud container clusters create $CLUSTER_NAME \
        --zone $ZONE \
        --num-nodes 1 \
        --machine-type e2-micro
fi

echo "Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE

echo "Creating namespaces..."
kubectl apply -f k8s/namespaces.yml

echo "Applying resource quotas..."
kubectl apply -f k8s/resourcequota.yml

echo "GKE setup completed successfully."