#!/bin/bash

pg_ctl --pgdata=../data -l logfile.txt start

echo ""
echo "Database directory:"
echo "  ../data"
echo ""
echo "Log file:"
echo "  logfile.txt"
echo ""

