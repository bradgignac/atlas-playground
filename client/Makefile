BIN := ./node_modules/.bin
HTML := $(wildcard lib/html/*.html)
LESS := $(wildcard lib/less/*.less)
JS := $(wildcard lib/js/*.jsx)

all: clean setup build

clean:
	rm -rf dist node_modules

setup: node_modules

build: dist dist/index.html dist/fonts dist/client.css dist/client.js

server:
	$(BIN)/http-server dist

node_modules: package.json
	npm install

dist:
	mkdir -p dist

dist/%.html: lib/html/%.html
	cp $? $@

dist/client.css: $(LESS)
	$(BIN)/lessc lib/less/client.less --include-path=node_modules > $@

dist/client.js: $(JS)
	$(BIN)/browserify -t [ reactify --es6 ] lib/js/client.jsx > $@

dist/fonts: node_modules/flat-ui/fonts
	cp -r $? $@

.PHONY: clean server
