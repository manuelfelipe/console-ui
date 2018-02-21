import { Log } from './log';

export const LOGS_RESPONSE: Log[] = [
  {
    proc: 'clone',
    pos: 0,
    out: '+ git init'
  },
  {
    proc: 'clone',
    pos: 1,
    out: 'Initialized empty Git repository in /drone/src/git.thecloud.com/projects/CLOUD/repos/dashboard-ui/browse/.git/'
  },
  {
    proc: 'clone',
    pos: 2,
    out: '+ git remote add origin https://git.thecloud.com/scm/cloud/dashboard-ui.git'
  },
  {
    proc: 'clone',
    pos: 3,
    out: '+ git fetch --no-tags origin +refs/heads/develop:'
  },
  {
    proc: 'clone',
    time: 1,
    pos: 4,
    out: 'From https://git.thecloud.com/scm/cloud/dashboard-ui'
  },
  {
    proc: 'clone',
    time: 1,
    pos: 5,
    out: ' * branch            develop    -> FETCH_HEAD'
  },
  {
    proc: 'clone',
    time: 1,
    pos: 6,
    out: ' * [new branch]      develop    -> origin/develop'
  },
  {
    proc: 'clone',
    time: 1,
    pos: 7,
    out: '+ git reset --hard -q fcb470f00a27cbd27776194e3ea25b75a6334707'
  },
  {
    proc: 'clone',
    time: 1,
    pos: 8,
    out: '+ git submodule update --init --recursive'
  },
  {
    proc: 'clone',
    type: 2,
    pos: 0,
    out: '0'
  },
  {
    proc: 'cache',
    pos: 0,
    out: '2017/05/03 15:12:35 trying to connect to 172.20.1.86'
  },
  {
    proc: 'cache',
    time: 4,
    pos: 2,
    out: '2017/05/03 15:12:39 cache restored in 4.255342718s'
  },
  {
    proc: 'cache',
    type: 2,
    pos: 0,
    out: '0'
  },
  {
    proc: 'build',
    pos: 0,
    out: '+ npm config set registry http://artifactory.ypdev.ca/artifactory/api/npm/npm-virtual'
  },
  {
    proc: 'build',
    pos: 1,
    out: 'npm info it worked if it ends with ok'
  },
  {
    proc: 'build',
    pos: 2,
    out: 'npm info using npm@3.10.9'
  },
  {
    proc: 'build',
    pos: 3,
    out: 'npm info using node@v6.9.2'
  },
];
