export interface SonarProjects {
  paging: SonarPaging;
  components: SonarProject[];
}

interface SonarProject {
  id: string;
  organization: string;
  key: string;
  name: string;
  qualifier: string;
}

interface SonarPaging {
  pageIndex: number;
  pageSize: number;
  total: number;
}
