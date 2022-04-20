FROM node:lts-fermium AS build
ADD . /OPEX-Web-APP
WORKDIR /OPEX-Web-APP
RUN yarn install
ARG API_BASE_URL=https://api.opex.dev
ENV REACT_APP_API_BASE_URL $API_BASE_URL
ARG CLIENT_ID='web-app'
ENV REACT_APP_CLIENT_ID $CLIENT_ID
ARG LOGIN_CLIENT_ID='admin-cli'
ENV REACT_APP_LOGIN_CLIENT_ID $LOGIN_CLIENT_ID
ARG CLIENT_SECRET='732494ea-f894-4f18-a915-0e50ca0928c0'
ENV REACT_APP_CLIENT_SECRET $CLIENT_SECRET
ARG GENERATE_SOURCEMAP=false
ENV GENERATE_SOURCEMAP $GENERATE_SOURCEMAP
RUN yarn build

FROM nginx:1.20.2
COPY --from=build /OPEX-Web-APP/build /var/www/opex/html
ADD default.conf /etc/nginx/conf.d
EXPOSE 80