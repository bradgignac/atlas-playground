BIN = ./node_modules/.bin

all: clean setup lint test

clean:
	rm -rf node_modules

setup:
	npm install

lint:
	$(BIN)/jshint lib test

test:
	$(BIN)/mocha test

.PHONY: clean setup lint test
