
# User Task Queuing with Rate Limiting

## Owerview
This application is designed to manage user tasks by queuing them and implementing rate limiting to ensure optimal resource utilization. It helps in limiting the rate at which tasks can be processed to avoid overwhelming the system.

## Features

- `Task Queuing`: Tasks are queued based on their priority and processed in a structured manner.

- `Rate Limiting`: Controls the rate at which tasks are processed to prevent overloading the system.

- `Concurrency Control`: Manages concurrent task execution to avoid conflicts and ensure data integrity.

- `Logging and Monitoring`: Provides logging and monitoring capabilities to track task execution and system performance.
## Tasks

- Build a Node.js API cluster with two replica sets and create a route to handle a simple task.

- The task has a rate limit of 1 task per second and 20 task per min for each user ID.

- Users will hit the route to process tasks multiple times.

- You need to implement a queueing system to ensure that tasks are processed according to the rate limit for each user ID.

## Approach

- For queuing the tasks I used bull library.

- To limit the users we need to have details of last few task done with the userId.

- I used redis to keep track of tasks done in last 1 min since it does't matter how many tasks done with the userId before it.

- I wrote a simple algorithm that calculates how much time the task to be delayed to achive the rate limiting.

- The `getDelayTime` function is responsible to calculate which takes userId as input and returns the time to delay (in milliseconds).

- Now the delay time is passed to bull queue to run the task after the delayed time.
## Installation

1. Clone the project

```bash
  git clone https://github.com/purunaik2000/User_Task_Queuing_with_Rate_Limiting.git
```

2. Go to the project directory

```bash
  cd user_task_queuing_with_rate_limiting
```

3. Install dependencies

```bash
  npm install
```



## Configuration
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `PORT`: The port number on which the application will run (default is 3000).

- `REDIS_HOST`: The hostname of the Redis server.

- `REDIS_PORT`: The port number of the Redis server.

- `REDIS_PASSWORD`: The password for Redis authentication.

- `RATE_LIMIT_WINDOW`: The time window (in milliseconds) for rate limiting.

- `RATE_LIMIT_MAX_REQUESTS_PER_WINDOW`: The maximum number of requests allowed within the time window for rate limiting.

- `RATE_LIMIT_MAX_REQUESTS_PER_SECOND`: The maximum number of requests allowed within 1 second for rate limiting.

- `QUEUE_NAME`: The queue name that is used by bull to store all the tasks.

- `LOG_PATH`: The file path where want to store the logs.
## Usage

1. Start the server

```bash
  npm run start
```

2. Access the application through the specified URL (e.g., http://localhost:3000).
## Request structure

- Route: `api/v1/task`

- Method: `POST`

- Body: `JSON`

```json
{
    "user_id": "123"
}
```

## Testing

To test the application import the `Rate-Limiting.postman_collection.json` file in postman

- Using `random user request` send a request with random user_id.

- Using `request with userId` send request with costom user_id.

- Use collection runner to send multiple requests at a time to check rate limiting is working fine or not.

- In logs file the task execution time is logged which will help to monitor the performance.

## Tech Stack

**Server:** Node, Express

## Dependencies

- Bull: It provides a simple API for defining job processors, adding jobs to the queue, and handling events reated to job processing.

- Redis: It is an open source, in-memory data structure store used as a database, cache to store a small and frequently used data.

- Winston: One of the most used a simple and universal logging library with support for multiple transports.

- Express: A node js framework that provides broad features for building web and mobile applications. It helps to cretae, manage the Servers and Routes.
