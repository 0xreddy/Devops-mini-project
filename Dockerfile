FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 6756
CMD ["nginx", "-g", "daemon off;"]