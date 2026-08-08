FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN cp /usr/share/nginx/html/weatherAPI.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]