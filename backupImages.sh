#!/bin/bash

# Step 1: Check if a container ID was passed as an argument
CONTAINER_ID=$(sudo docker container ls | grep bridge-node-app | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
  echo "Failed to get container id";
  exit 1;
else 
  echo "Succesfully identified container with id: $CONTAINER_ID";
fi

# Step 2: Define the destination directory
DEST_DIR="./temp/assets/images"

# Step 3: Create the destination directory
sudo mkdir -p $DEST_DIR

# Step 4: Copy the assets/images directory from the running container to the destination directory
sudo docker cp $CONTAINER_ID:/home/bridge/assets/images/. $DEST_DIR

# Step 5: Verify that the files were copied
if [ "$(ls -A $DEST_DIR)" ]; then
  echo "Files successfully copied to $DEST_DIR"
else
  echo "Failed to copy files. Directory is empty."
fi
