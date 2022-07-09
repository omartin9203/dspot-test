FROM node:14-alpine
#
#LABEL name=dspot-test-backend
#LABEL intermediate=true

WORKDIR /var/www/app

#COPY ["package*.json", "tsconfig*.json", "yarn.lock", "./"]
RUN ["yarn", "install", "--frozen-lockfile"]
#
#COPY ["templates/", "templates/"]
#COPY ["src/", "src/"]

RUN ["npm", "i", "-g", "rimraf"]
#RUN ["yarn", "build"]

#RUN  ["rm", "-r", "src"]

#FROM node:12-alpine
#
#LABEL name=dspot-test-backend
#
#WORKDIR /root
#
#COPY --from=builder ["/root", "./"]
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}

EXPOSE 4000

CMD ["yarn", "start:dev"]