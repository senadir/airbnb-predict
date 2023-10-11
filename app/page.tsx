// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Wifi, Microwave } from "lucide-react";
import { useState } from "react";

const locations = [
  "Eixample",
  "Ciutat Vella",
  "Sants-Montjuïc",
  "Sant Martí",
  "Les Corts",
  "Gràcia",
  "Horta-Guinardó",
  "Sarrià-Sant Gervasi",
  "Sant Andreu",
  "Nou Barris",
];

export default function Home() {
  const [form, setForm] = useState({
    location: "",
    bathrooms: 1,
    bedrooms: 1,
    amenities: [],
  });

  const [predictedPrice, setPredictedPrice] = useState(0);

  const submitForm = () => {
    // submit data to server endpoint from openAPI
    fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-12">
      <Card className="border-none shadow-none w-[32rem]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Predict Price</CardTitle>
          <CardDescription>
            Enter your location info to predict its price
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              onValueChange={(location) => setForm({ ...form, location })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Location..." />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                placeholder="1"
                type="number"
                min="1"
                value={form.bathrooms}
                onChange={(e) =>
                  setForm({ ...form, bathrooms: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                placeholder="1"
                type="number"
                min="1"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-2">
              <Toggle
                variant="outline"
                aria-label="Toggle italic"
                pressed={form.amenities.includes("wifi")}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    setForm({
                      ...form,
                      amenities: [...form.amenities, "wifi"],
                    });
                  } else {
                    setForm({
                      ...form,
                      amenities: form.amenities.filter((a) => a !== "wifi"),
                    });
                  }
                }}
              >
                <Wifi className="w-4 h-4 mr-2" />
                Wifi
              </Toggle>
              <Toggle
                variant="outline"
                aria-label="Toggle italic"
                pressed={form.amenities.includes("kitchen")}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    setForm({
                      ...form,
                      amenities: [...form.amenities, "kitchen"],
                    });
                  } else {
                    setForm({
                      ...form,
                      amenities: form.amenities.filter((a) => a !== "kitchen"),
                    });
                  }
                }}
              >
                <Microwave className="w-4 h-4 mr-2" />
                Kitchen
              </Toggle>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={submitForm}>
            Predict Price
          </Button>
        </CardFooter>
      </Card>
      <h2 className="flex items-center gap-2 font-bold">
        Predicted Price:{" "}
        {predictedPrice ? (
          <span className="text-2xl">{predictedPrice} €</span>
        ) : (
          <Skeleton className="w-24 h-8" />
        )}
      </h2>
    </main>
  );
}
