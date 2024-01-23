FROM denoland/deno

EXPOSE 8000

WORKDIR /

ADD . /

RUN deno cache app.ts

CMD ["run", "-A", "app.ts"]
