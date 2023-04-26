/*********************************************************************
 This is an example for our nRF51822 based Bluefruit LE modules

 Pick one up today in the adafruit shop!

 Adafruit invests time and resources providing this open source code,
 please support Adafruit and open-source hardware by purchasing
 products from Adafruit!

 MIT license, check LICENSE for more information
 All text above, and the splash screen below must be included in
 any redistribution
*********************************************************************/

#include <Arduino.h>
#include <SPI.h>
#include <Adafruit_BluefruitLE_UART.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"

#include "BluefruitConfig.h"

int32_t sensorServiceId;
int32_t batteryServiceId;
int32_t sensorCharId;

/*=========================================================================
    APPLICATION SETTINGS

    FACTORYRESET_ENABLE       Perform a factory reset when running this sketch
   
                              Enabling this will put your Bluefruit LE module
                              in a 'known good' state and clear any config
                              data set in previous sketches or projects, so
                              running this at least once is a good idea.
   
                              When deploying your project, however, you will
                              want to disable factory reset by setting this
                              value to 0.  If you are making changes to your
                              Bluefruit LE device via AT commands, and those
                              changes aren't persisting across resets, this
                              is the reason why.  Factory reset will erase
                              the non-volatile memory where config data is
                              stored, setting it back to factory default
                              values.
       
                              Some sketches that require you to bond to a
                              central device (HID mouse, keyboard, etc.)
                              won't work at all with this feature enabled
                              since the factory reset will clear all of the
                              bonding data stored on the chip, meaning the
                              central device won't be able to reconnect.
    MINIMUM_FIRMWARE_VERSION  Minimum firmware version to have some new features
    MODE_LED_BEHAVIOUR        LED activity, valid options are
                              "DISABLE" or "MODE" or "BLEUART" or
                              "HWUART"  or "SPI"  or "MANUAL"
    -----------------------------------------------------------------------*/
    #define FACTORYRESET_ENABLE         1
    #define MINIMUM_FIRMWARE_VERSION    "0.6.6"
    #define MODE_LED_BEHAVIOUR          "MODE"
/*=========================================================================*/

// Create the bluefruit object, either software serial...uncomment these lines
/*
SoftwareSerial bluefruitSS = SoftwareSerial(BLUEFRUIT_SWUART_TXD_PIN, BLUEFRUIT_SWUART_RXD_PIN);

Adafruit_BluefruitLE_UART ble(bluefruitSS, BLUEFRUIT_UART_MODE_PIN,
                      BLUEFRUIT_UART_CTS_PIN, BLUEFRUIT_UART_RTS_PIN);
*/

/* ...or hardware serial, which does not need the RTS/CTS pins. Uncomment this line */
Adafruit_BluefruitLE_UART ble(Serial1, BLUEFRUIT_UART_MODE_PIN);

/* ...hardware SPI, using SCK/MOSI/MISO hardware SPI pins and then user selected CS/IRQ/RST */
//Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);

/* ...software SPI, using SCK/MOSI/MISO user-defined SPI pins and then user selected CS/IRQ/RST */
//Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_SCK, BLUEFRUIT_SPI_MISO,
//                             BLUEFRUIT_SPI_MOSI, BLUEFRUIT_SPI_CS,
//                             BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);


// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}

/**************************************************************************/
/*!
    @brief  Sets up the HW an the BLE module (this function is called
            automatically on startup)
*/
/**************************************************************************/
void setup(void)
{
  while (!Serial);  // required for Flora & Micro
  delay(500);

  Serial.begin(115200);
  Serial.println(F("Adafruit Bluefruit Command Mode Example"));
  Serial.println(F("---------------------------------------"));

  /* Initialise the module */
  Serial.print(F("Initialising the Bluefruit LE module: "));

  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }
  Serial.println( F("OK!") );

  if ( FACTORYRESET_ENABLE )
  {
    /* Perform a factory reset to make sure everything is in a known state */
    Serial.println(F("Performing a factory reset: "));
    if ( ! ble.factoryReset() ){
      error(F("Couldn't factory reset"));
    }
  }

  /* Disable command echo from Bluefruit */
  ble.echo(false);

  Serial.println("Requesting Bluefruit info:");
  /* Print Bluefruit information */
  ble.info();

  while (! ble.sendCommandCheckOK(F("AT+GAPDEVNAME=Smart Knee Brace")) ) {
    Serial.println(F("Could not set device name?"));
    Serial.println(F("Setting device name to 'Smart Knee Brace': "));
  }

  Serial.println(F("Adding the sensor Service definition (UUID = 59-f5-bf-56-80-3a-45-25-82-02-12-84-c6-d0-f0-73): "));
  bool success = false;
  while (!success)
  {
    success = ble.sendCommandWithIntReply( F("AT+GATTADDSERVICE=UUID128=59-f5-bf-56-80-3a-45-25-82-02-12-84-c6-d0-f0-73"), &sensorServiceId);
    if (!success)
    {
      Serial.println(F("Could not add sensor service"));
    }
  }

  Serial.println(F("Adding the sensor characteristic (UUID = 0x0002): "));
  success = false;
  while (!success)
  {
    success = ble.sendCommandWithIntReply( F("AT+GATTADDCHAR=UUID=0x0002, PROPERTIES=0x12, MIN_LEN=1, MAX_LEN=10, VALUE=0"), &sensorCharId);
    if (!success)
    {
      Serial.println(F("Could not add sensor characteristic"));
    }
  }

  Serial.println(F("Adding the Battery Service definition (UUID = 00-00-18-0f-00-00-10-00-80-00-00-80-5f-9b-34-fb): "));
  success = false;
  while (!success)
  {
    success = ble.sendCommandWithIntReply( F("AT+GATTADDSERVICE=UUID=0x180F"), &batteryServiceId);
    if (!success)
    {
      Serial.println(F("Could not add Battery service"));
    }
  }


  ble.verbose(false);  // debug info is a little annoying after this point!

  /* Reset the device for the new service setting changes to take effect */
  Serial.println(F("Performing a SW reset (service changes require a reset): "));
  ble.reset();
  Serial.print(F("Success!"));

  Serial.println();

  /* Wait for connection */
  while (! ble.isConnected()) {
      delay(500);
  }

  // LED Activity command is only supported from 0.6.6
  if ( ble.isVersionAtLeast(MINIMUM_FIRMWARE_VERSION) )
  {
    // Change Mode LED Activity
    Serial.println(F("******************************"));
    Serial.println(F("Change LED activity to " MODE_LED_BEHAVIOUR));
    ble.sendCommandCheckOK("AT+HWModeLED=" MODE_LED_BEHAVIOUR);
    Serial.println(F("******************************"));
  }
}

/**************************************************************************/
/*!
    @brief  Constantly poll for new command or response data
*/
/**************************************************************************/
void loop(void)
{

  int sensorReading = analogRead(STRETCH_PIN);

  Serial.print(F("Updating sensor value to "));
  Serial.println(sensorReading);

  ble.print(F("AT+GATTCHAR="));
  ble.print(sensorCharId);
  ble.print(F(","));
  ble.println(sensorReading);

  // check response stastus
  if (! ble.waitForOK() ) {
    Serial.println(F("Failed to send?"));
  }

  //delay(50);
}
