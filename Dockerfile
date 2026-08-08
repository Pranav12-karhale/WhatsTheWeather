FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/sh", "-c", "echo \"const ENV = { API_KEY: '${API_KEY}' };\" > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]