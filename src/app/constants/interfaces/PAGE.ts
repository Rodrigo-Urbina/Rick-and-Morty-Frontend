export interface PAGE {
    info: {
      count: Number;
      pages: Number;
      pageSize: Number;
      next: String;
      prev: String;
    },
    results: [{
      id: Number;
      name: String;
      status: String;
      species: String;
      type: String;
      gender: String;
      origin: {
        name: String;
        url: String;
      };
      location: {
        name: String;
        url: String;
      };
      image: String;
      episode: [String];
      url: String;
      created: String;
    }]
  }
  