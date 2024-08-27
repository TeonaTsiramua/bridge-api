#!/bin/bash

# Step 1: Check if a container ID was passed as an argument
CONTAINER_ID=$(sudo docker container ls | grep bridge-node-ap | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
  echo "Failed to get container id";
  exit 1;
else 
  echo "Succesfully identified container with id: $CONTAINER_ID";
fi

# Step 2: Define the source directory
SOURCE_DIR="./temp/assets/images"

# Step 3: Check if the source directory exists and is not empty
if [ ! -d "$SOURCE_DIR" ] || [ -z "$(ls -A $SOURCE_DIR)" ]; then
  echo "Source directory $SOURCE_DIR does not exist or is empty."
  exit 1
fi

# Step 4: Copy the assets/images directory from the temp folder to the running container
sudo docker cp $SOURCE_DIR/* $CONTAINER_ID:/home/bridge/assets/images

sudo rm -rf ./temp

# Step 5: Verify that the files were copied successfully
if [ $? -eq 0 ]; then
  echo "Files successfully copied to the container $CONTAINER_ID:/home/bridge/assets/images"
else
  echo "Failed to copy files to the container."
  exit 1
fi
