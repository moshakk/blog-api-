const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API Documentation',
      version: '1.0.0',
      description:
        'A robust and scalable RESTful API for a blogging platform built with Node.js, Express, and MongoDB. This API provides complete authentication, authorization, and CRUD operations for posts and comments with advanced querying capabilities.',
      contact: {
        name: 'Ahmed Khamis',
        email: 'ahmedkhamis6928@gmail.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://blog-api-production.up.railway.app/api-docs',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'confirmPassword'],
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 8,
              description: 'User password (min 8 characters)',
              example: 'password123',
            },
            confirmPassword: {
              type: 'string',
              format: 'password',
              description: 'Password confirmation',
              example: 'password123',
            },
          },
        },
        Post: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            _id: {
              type: 'string',
              description: 'Post ID',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              description: 'Post title',
              example: 'Getting Started with Node.js',
            },
            content: {
              type: 'string',
              description: 'Post content',
              example: 'Node.js is a powerful runtime for building...',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Post tags',
              example: ['Node.js', 'JavaScript', 'Backend'],
            },
            author: {
              type: 'string',
              description: 'Post author name',
              example: 'John Doe',
            },
            likes: {
              type: 'number',
              default: 0,
              description: 'Number of likes',
              example: 10,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Post creation date',
            },
          },
        },
        Comment: {
          type: 'object',
          required: ['text', 'postId'],
          properties: {
            _id: {
              type: 'string',
              description: 'Comment ID',
              example: '507f1f77bcf86cd799439012',
            },
            postId: {
              type: 'string',
              description: 'Associated post ID',
              example: '507f1f77bcf86cd799439011',
            },
            text: {
              type: 'string',
              description: 'Comment text',
              example: 'Great article! Very helpful.',
            },
            author: {
              type: 'string',
              description: 'Comment author name',
              example: 'Jane Smith',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Comment creation date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'fail',
            },
            message: {
              type: 'string',
              example: 'Error message description',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  //apis: ['./routes/*.js', './controllers/*.js'], // Path to the API routes
  apis: [__dirname + '/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
