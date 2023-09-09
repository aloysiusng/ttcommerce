# TikTok Commerce

We imagined a future where E-Commerce meets Social Media, and Tiktok would be the perfect platform by having both TikTok Shop and TikTok Live, a streaming platform that has many Tiktokers streaming content live to millions of people every day and a virtual marketplace all on the same platform.  Tiktok Commerce is a web application for both Suppliers and TikTokers to manage their dropshipping platform.

## Installation & Testing

Interact with our webpage at [https://ttcommerce.vercel.app/](https://ttcommerce.vercel.app/)

1) Click on "Log in" at the top right of the webpage
2) To log in as a seller, log in with seller@gmail.com
3) To log in as a tiktoker, log in with any email

Local Development:

1) Download our code and open the project in Visual Studio Code. Open a new terminal.
2) Run the following commands:
3) cd .\frontend\tt-hackathon-fe\
4) npm i 
5) npm run dev
6) Enjoy TikTok Ecommerce!


## Contributing

The project was contributed by:
1) Cleve Huang
2) Gregory Ong
3) Chua Yu Hao
4) Aloysius Ng
5) Brandon Christopher

## Additional Information

The entire backend is serverless and hosted on AWS and built through terraform and a pipeline deployed on Github actions.

aws_policies documents the policies applied in AWS
parameters such as AWS region, S3 bucket name... are stored as secrets in github actions

## Cloud Architecture 

![Cloud Architecture](cloudarchi.png)
