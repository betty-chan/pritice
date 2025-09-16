# Makefile for compiling C++ to WebAssembly

# Define the compiler and flags
CC = emcc
CFLAGS = -O3

# Define the target and source files
TARGET = example
SRC = example.cpp

# Build rule
all: $(TARGET).wasm

$(TARGET).wasm: $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET).html

# Clean rule
clean:
	rm -f $(TARGET).wasm $(TARGET).html $(TARGET).js