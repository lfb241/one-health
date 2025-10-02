VAR=""
ENV_VAR=".env.development"

run_update() {
    echo "====================================================================="
    echo "run-update: Starting command"
    echo "====================================================================="

    echo "Checking to main branch and pulling changes"
    git checkout main
    git pull

    echo "====================================================================="
    echo "run-update: Finishing command"
    echo "====================================================================="
}

usage(){
    echo "====================================================================="
    echo "Options"
    echo "====================================================================="
    echo " -u, --update         Pulls newest main"
    echo " -nc, --no-cache      Builds Container without caching"   
    echo "====================================================================="  
}


while [ $# -gt 0 ]; do
    case $1 in
        -h | --help)
            usage
            return 0
            ;;

        -u | --update)
            run_update
            ;;

        -nc | --no-cache)
            VAR="--no-cache"
            ;;
        
*)
            echo "Invalid option $1" >&2
            return 1 
            ;;
    esac
    shift
done
     
echo "====================================================================="
echo "run-compose.sh: Starting script"
echo "====================================================================="

echo "run-compose.sh: Removing all the containers"
docker-compose rm -s -f

echo "run-compose.sh: Building the server and client images"
docker-compose build $VAR

echo "run-compose.sh: Running the containers"
docker-compose up

echo "====================================================================="
echo "run-compose.sh: Finishing script"
echo "====================================================================="