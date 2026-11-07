export interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

export interface PolicyDocument {
  id: string;
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: PolicySection[];
}
