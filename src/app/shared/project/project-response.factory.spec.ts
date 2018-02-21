import { TestBed } from '@angular/core/testing';
import { ProjectResponseFactory } from './project-response.factory';
import { Project } from './project';
import { PROJECTS_RESPONSE } from './projects.data';

describe('ProjectsResponseFactory Tests', () => {
  let responseFactory: ProjectResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new ProjectResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toProject', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toProject(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Project = {
        name: 'YPID/ypid-proxy',
        createdAt: new Date('2017-05-17T13:36:54.392Z'),
        isDeleted: false,
        repository: {
          name: 'ypid-proxy',
          owner: 'YPID'
        },
        namespaces: [
          {
            name: 'ypidypid-proxy',
            clusters: [
              'aws'
            ]
          },
          {
            name: 'ypidypid-proxy-develop',
            clusters: [
              'aws'
            ]
          },
          {
            name: 'ypidypid-proxy-qa',
            clusters: [
              'aws'
            ]
          }
        ]
      };

      const response = responseFactory.toProject(PROJECTS_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toProjects', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toProjects(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Project[] = [
        {
          name: 'YPID/ypid-proxy',
          createdAt: new Date('2017-05-17T13:36:54.392Z'),
          isDeleted: false,
          repository: {
            name: 'ypid-proxy',
            owner: 'YPID'
          },
          namespaces: [
            {
              name: 'ypidypid-proxy',
              clusters: [
                'aws'
              ]
            },
            {
              name: 'ypidypid-proxy-develop',
              clusters: [
                'aws'
              ]
            },
            {
              name: 'ypidypid-proxy-qa',
              clusters: [
                'aws'
              ]
            }
          ]
        },
        {
          name: 'YPID/users',
          createdAt: new Date('2017-05-17T13:43:10.672Z'),
          isDeleted: false,
          repository: {
            name: 'users',
            owner: 'YPID'
          },
          namespaces: [
            {
              name: 'ypidusers',
              clusters: [
                'aws'
              ]
            },
            {
              name: 'ypidusers-qa',
              clusters: [
                'aws'
              ]
            }
          ]
        },
        {
          name: 'CLOUD/console-ui',
          createdAt: new Date('2017-05-17T13:43:10.714Z'),
          isDeleted: false,
          repository: {
            name: 'console-ui',
            owner: 'CLOUD'
          },
          namespaces: [
            {
              name: 'console',
              clusters: [
                'aws'
              ]
            }
          ]
        },
      ];

      const response = responseFactory.toProjects(PROJECTS_RESPONSE);
      expect(response).toEqual(EXPECTED);
    });
  });

});
