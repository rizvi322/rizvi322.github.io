Started working as part of **Widget framework(WF)** team. **WF** is an add-on product for the Escenic Content Engine(ECE). Some of the significant features of WF that I have worked on are:

- **Build system** of the product. It involves Jenkins build and deployment scirpts, processing resources, merging several configuration layers creating final distribution, crating RCs etc.
- **Core of the framework**. Woked on handling concurrent requests, request filter chain, **lazy loading**, **image processing**, image preloading, caching, context resolving, **REST** webservices etc.
- **Datasource**: Fetching different types of content form different sources like **solr**, analysis engine, our CMS. It is extendable and can be used to fetch data from custom sources.
- **Media widget**: From processing video and audio. We use Amazon Elastic transcoder for media transcoding and Amazon S3 storage for stroing.
- **Teaser widget**: A hightly customizable widget that simplifies the presentaiton of the framework in the website.

Apart from WF, I have also

- Worked on database, server logs and configurations, tomcat configurations, performance improvement of datasource, the entire distributed escenic system while debugging and handling customer issues.
- Worked on our main CMS known as the **Escenic Content Engine**, **Poll plugin**, **Analysis engine**. Worked on architecture and development of our content versioning system (**Snapshot plugin**) from the scratch.

I am currently working on our newest product **CUE**. It is fully web based and use **Escenic Content Engine** as the backend. I am mainly working on the new **decoupled presentation framework** known as **CUE Front**. It is highly scalable(we have used **docker**), Technology independent(**REST** based), Easily Upgradeabe.

Details about our products are provided in the company website: [http://www.escenic.com/](http://www.escenic.com/) and on our documentation site: [http://docs.escenic.com/](http://docs.escenic.com/)