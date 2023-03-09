###########################
# This is a "builder" pattern in Docker.
# We need to process our React code into
# static files that we can serve (npm run build).
# You could also skip this part and just run 
# "npm run build" and copy over the output manually
# like some kind of barbarian
###########################

FROM node:lts-alpine as builder

WORKDIR /frontend

# These two lines will allow us to pass in an environment
# variable when the image is *built* (not run).  For local
# development, localhost; for production, your EC2's IP address
ARG REACT_APP_BASE_URL=localhost
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

COPY ./frontend/package.json .
RUN npm install
COPY ./frontend .
RUN npm run build




###########################
# This is the final image we want.
#  First, it sets up the DRF application.
#  Then, it copies over a config file which basically says:
# "if any requests come in whose uri starts with /api/,
# then hand them off to the gunicorn (Django) server, 
# otherwise, serve up the React static files."
# Finally, it copies over the React static files to the place
# where nginx expects them to be.
###########################
FROM nginx:alpine

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools


COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt
COPY ./backend .
RUN python manage.py makemigrations && python manage.py migrate

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html

CMD nohup gunicorn --bind=0.0.0.0:8000 playgrounds.wsgi:application & nginx -g 'daemon off;'