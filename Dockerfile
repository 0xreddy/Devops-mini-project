FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 6060
CMD ["nginx", "-g", "daemon off;"]