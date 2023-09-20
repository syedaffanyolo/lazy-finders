# lazy-finder boiler plat code#

#run loop to see if in idel or not(conntact data transfer with charge booth)#

    #if in idel,allow charging, disbale panel#
    #else, allow panel charge and run on battery#
        #start recording data for key use#
        #after locked, wait for route plan setting and other settings#
        #after route set, enable route plan directions with google api and start gps tracker code to send to user#
        #start cv and sensor packs to avoid obstacles#
        #if obstacle#
            #stall until clear#
            #stalling more than 40seconds send ping to student and auth#
            #more than 2 mins stall, go gps idel and few sec apart beeps, turn on solar and batt both#
        #reached location#
        #if obstacle#
            #stall until clear#
            #stalling more than 40seconds send ping to auth#
            #more than 2 mins stall, go gps idel and few sec apart beeps, turn on solar and batt both#
        #set back route#
import requests
import geocoder
import time
import googlemaps
from datetime import datetime
charge = True
noroute = True
api_url = "http://lazyfinder.pythonanywhere.com"
api_key = 'AIzaSyAh1HvFyW5PQ4bRFLw4QJzNJk-XWSRWISw'
lat = 0
long = 0
curlat = 0
curlong = 0
blocklist = {
 "a":"12.789,74.89",
 "b":",",
 "c":",",
 "d":",",
 "e":",",
 "f":",",
 "g":",",
 "h":",",
 "i":",",
 "j":",",
 "k":",",
 "l":",",
 "m":",",
 "n":",",
 "o":",",
 "p":",",
 "q":",",
 "r":","
}
start = False
keystat = [0]

while True:

    while charge:
        statuscharge = input("charging(battery) solar panel disabled")
        if statuscharge == 'f': #pressed a bot deploy button on booth#
            print("ready to deliver")
            charge = False
    # keystat.append[1] #storage opened#
    while noroute:
        statusroute = input("select block")
        for block in blocklist.keys():
                if statusroute == block:
                    lat,long = str(blocklist[block]).split(',')
                    print("latitude set to: "+ lat)
                    print("longitude set to: "+ long)
                    noroute = False
                    start = True
    # keystat.append[0]#storage closed#
    while start:
        def main():
            try:
                while True:
                    # Use the 'geocoder.ip' function with 'method="wifi"' to fetch location based on nearby Wi-Fi networks
                    location = geocoder.ip('me')

                    if location.ok:
                        latitude = location.latlng[0]
                        longitude = location.latlng[1]
                        print(f"Latitude: {latitude}, Longitude: {longitude}")
                        curlat = latitude
                        curlong = longitude
                    else:
                        print("Could not retrieve location data")

                    response =  requests.get(api_url+"/"+str(latitude)+"/"+str(longitude))
                    print(response.json())                   

            except KeyboardInterrupt:
                print("Location program terminated by user")

        if __name__ == "__main__":
            main()
        def maing():
    
            gmaps = googlemaps.Client(key=api_key)

            try:
                # Define the origin and destination addresses or coordinates
                origin = str(curlat)+str(curlong)
                destination = str(lat)+str(long)

                # Request directions
                directions_result = gmaps.directions(origin, destination, mode="driving", departure_time=datetime.now())

                if directions_result:
                    # Print the summary of the first route
                    route_summary = directions_result[0]['summary']
                    print(f"Route Summary: {route_summary}")

                    # Print each step in the route
                    for step in directions_result[0]['legs'][0]['steps']:
                        print(step['html_instructions'])
                        print(f"Distance: {step['distance']['text']}")
                        print(f"Duration: {step['duration']['text']}\n")

                else:
                    print("No directions found")

            except Exception as e:
                print(f"An error occurred: {e}")

        
        maing()
        














    # class DeliveryRobot:
    #     def __init__(self):
    #         self.idle = True
    #         self.battery = 100  # Battery percentage
    #         self.route_set = False
    #         self.location = None
    #         self.obstacle = False
    #         self.stall_start_time = None

    #     def charge(self):
    #         # Simulate charging the robot
    #         print("Charging...")
        

    #     def run_on_battery(self):
    #         self.idle = False

    #         # Simulate recording data and waiting for route plan
    #         print("Recording data and waiting for route plan...")
    #         time.sleep(3)  # Simulating 3 seconds of data recording
    #         self.route_set = True
    #         print("Route set. Starting delivery...")

    #         while True:
    #             if self.obstacle:
    #                 self.stall()
    #             else:
    #                 self.move()

    #     def move(self):
    #         # Simulate moving towards the destination
    #         print("Moving towards the destination...")
    #         time.sleep(2)  # Simulating 2 seconds of movement

    #         # Simulate reaching the destination
    #         print("Destination reached.")
    #         self.route_set = False
    #         self.location = None
    #         self.idle = True

    #     def stall(self):
    #         if self.stall_start_time is None:
    #             self.stall_start_time = time.time()

    #         current_time = time.time()
    #         stall_duration = current_time - self.stall_start_time

    #         if stall_duration >= 40:
    #             print("Stalled for more than 40 seconds. Sending ping to student and auth...")

    #         if stall_duration >= 120:
    #             print("Stalled for more than 2 minutes. Going idle and activating solar and battery...")
    #             self.idle = True
    #             self.stall_start_time = None

    #     def avoid_obstacle(self):
    #         # Simulate obstacle detection and avoidance
    #         self.obstacle = True
    #         print("Obstacle detected. Stopping...")
    #         time.sleep(1)  # Simulating 1 second of stopping
    #         print("Obstacle cleared.")
    #         self.obstacle = False

    #     def deliver_package(self):
    #         if self.idle:
    #             self.charge()
    #         else:
    #             self.run_on_battery()

    # if __name__ == "__main__":
    #     robot = DeliveryRobot()
    #     robot.deliver_package()


        

