FROM node:15.14.0

LABEL version=1.0
LABEL maintainer="Mateusz Zajac"

# /app to to samo co .
COPY package.json package-lock.json /app/ 

WORKDIR /app

ARG NODE_ENV
# RUN npm i

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm i; \
    else npm i --only=production; \
    fi

ENV PORT=4040
# ->mozna napisac  . ./
COPY . /app/
EXPOSE 4040
# RUN useradd -ms /bin/bash user999 && chown user999:user999 /app
# USER user999

# CMD npm run start
CMD ["node", "src/app.js"]