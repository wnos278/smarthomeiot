#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include "DHT.h"            

#define TIME_MSG_LEN  11   // time sync to PC is HEADER and unix time_t as ten ascii digits
#define TIME_HEADER  255   // Header tag for serial time sync message
#define LED 12 // Chân output bật đèn

// Thông tin về wifi
#define ssid "P210"
#define password "11112222"
#define mqtt_server "192.168.22.9" // IP của MQTTBroker server
const uint16_t mqtt_port = 1883; //Port của MQTTBroker TCP

// Khởi tạo để giao tiếp MQTT
WiFiClient espClient;
PubSubClient client(espClient);

// Định nghĩa các input và output
// DHT11
const int DHTPIN = 14;      
const int DHTTYPE = DHT11;  
DHT dht(DHTPIN, DHTTYPE);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

void setup() 
{
  Serial.begin(115200);
  delay(10);
  dht.begin();  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port); 
  client.setCallback(callback);

  timeClient.begin();
  timeClient.setTimeOffset(0);
  pinMode(LED, OUTPUT);
}

// Hàm kết nối wifi
void setup_wifi() 
{
  delay(2000);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
// Hàm call back để nhận dữ liệu
void callback(char* topic, byte* payload, unsigned int length) 
{
  if (topic[0] == 'h' && 
  topic[1] == 'o' && 
  topic[2] == 'm' && 
  topic[3] == 'e' && 
  topic[4] == 'i' && 
  topic[5] == 'n' && 
  topic[6] == 'f' && 
  topic[7] == 'o') return;
  
  for (int i = 0; i < length; i++) 
    Serial.print((char)payload[i]);

// Điều khiển đèn led

  if (payload[0] == 't' && 
  payload[1] == 'u' &&
  payload[2] == 'r' &&
  payload[3] == 'n' &&
  payload[4] == 'O' &&
  payload[5] == 'n' &&
  payload[6] == 'L' &&
  payload[7] == 'e' &&
  payload[8] == 'd')
  {
    digitalWrite(LED, HIGH); // BẬT ĐÈN LED
  }
  else if (payload[0] == 't' && 
  payload[1] == 'u' &&
  payload[2] == 'r' &&
  payload[3] == 'n' &&
  payload[4] == 'O' &&
  payload[5] == 'f' &&
  payload[6] == 'f' &&
  payload[7] == 'L' &&
  payload[8] == 'e' &&
  payload[9] == 'd')
  {
    digitalWrite(LED, LOW); // TẮT ĐÈN LED
  }
}
// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() 
{
  while (!client.connected()) // Chờ tới khi kết nối
  {
    // Thực hiện kết nối với mqtt user và pass
    if (client.connect("ESP8266_id1","admin","admin"))  //kết nối vào broker
    {
      Serial.println("Đã kết nối:");
      client.subscribe("dkled"); // kết nối điều khiển led
      client.subscribe("homeinfo"); // gửi thông tin homeinfo
    }
    else 
    {
      Serial.print("Lỗi:, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}

void loop() 
{

    if (!client.connected())// Kiểm tra kết nối
    reconnect();
  client.loop();
  delay(30);
  timeClient.update();

  int currentHour = (timeClient.getHours() + 7) % 24; 
  int currentMinute = timeClient.getMinutes();
  int currentSecond = timeClient.getSeconds();

  String str = String(currentHour, DEC) + ":" + String(currentMinute, DEC) + ":" + String(currentSecond, DEC); 
  if (currentSecond % 60 == 30)
  {
    float h = dht.readHumidity();    
  float t = dht.readTemperature(); 
  String thongtin = "";
  thongtin.concat("{");
  thongtin.concat("\"temperature\":");
  thongtin.concat(t);
  thongtin.concat(", ");
  thongtin.concat("\"humidity\":");
  thongtin.concat(h);
  thongtin.concat(", ");
  thongtin.concat("\"time\":\"");
  thongtin.concat(str);
  thongtin.concat("\"}");
  Serial.println(thongtin);
  char cThongtin[100];
  thongtin.toCharArray(cThongtin, 100);
  Serial.println(cThongtin);
  client.publish("homeinfo", cThongtin);
  delay(1000);
  }
  
}
