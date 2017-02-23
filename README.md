# madziajapko-stream-notifier
Stan na dzień 23.02.2017r., ok godziny 10:00
> 
> ## <p style="color: red"> Wersja beta gotowa do testowania! </p>
> 

## <b> Co działa? </b>
* okienko programu
* sprawdzanie statusu streamu
* wyświetlanie opisu
* wyświetlanie gry (trochę zepsute, ponieważ pokazuje jedynie HitBoxowe id gry (ale nie numerki!))
* odświeżanie
* kontrola błędów (w razie czego pisać na Discordzie!)
* dosyć dobra optymalizacja (ostatnie sprawdzanie ok 13 MB pamięci - Windows, ok 29 MiB linux (110 MiB RSS))*
* (Linux (możliwe, że także OSX)) powiadomienia


> \* = chodzi o fazę produkcyjną!

<br>
<hr>

## <b style="color: red;"> Błędy: </b>
* <p style="color: red;"> w wersji dla Windowsa nie działają powiadomienia

<br>
<hr>

## <b> Możliwe w planach </b>
> Prawdopodobnie (w większości) nigdy nie zostaną spełnione z powodu szybkiego terminu przejścia na Twitch.
>> Chyba, że jednak dam się namówić i rzeczywiście zrobię wersję na Twitcha 

* Po pierwsze wersja użytkowa (.exe, niewymagająca node.js i modułów)
* Możliwy instalator
* Nowy, lepszy wygląd!
* Odświeżanie ręczne
* Ustawienia m.in.:
> * Częstotliwości odświeżania
> * Kolorystyki
> * Może nawet import własnych .css'ów?
> * Typu okienka (bez krawędzi lub z nimi)
> * Rodzaju powiadomień
> * Zachowanie tray'a systemowego
> * Alternatywnych streamerów (wtedy konieczne będzie pobranie ich avatara)
> * Exportowanie i importowanie ustawień
> * Narzędzi developerskich (zablokowanie ich użycia z poziomu wersji użytkowej?)
* Jakaś dokumentacja
* Paczki dla OSX oraz Linux (.tar.gz, .rpm, .deb)
* Ulepszenie kodu
* Dalsza optymalizacja (może trochę zmodyfikowany model)
* Spis treści (tutaj)
* Więcej możliwości zgłaszania błędów
* Wersje dla innych streamerów
* Pierwsze osoby które się zgłoszą na PW, że aż tutaj doczytały dostaną kluczyk do jakiejś gry (do wyczerpania zapasów)
* Możliwe, że wezmę ten kod i na jego podstawie zrobię bota do Discorda, chociaż wątpię
* Możliwość wstrzymania działania programu
* Bardziej użyteczne menu "pod alt'em" (PRO TIP: jak się naciśnie ALT to się wyświetla)
* Dodanie jakichś fajnych efektów dźwiękowych jak stream zadziała
* (może, opcjonalnie, na pewno nie jako główny projekt) Wersja dla Twitcha
* <p style="color: red"> Odśmiecić z niepotrzebnych plików

<br>
<hr>

## <b> Jak uruchomić: </b>

> Do czasu aż nie znajdę sposobu jak zrobić wersje wykonywalną (.exe) patrz dział "Kompilacja:"

<br>
<hr>

## <b> Kompilacja: </b>

> Opcjonalnie (ale zalecane):

### Pobieranie przez Git:
 * Upewnij się, że posiadasz zainstalowane [oprogramowanie git](https://pl.wikipedia.org/wiki/Git_(oprogramowanie)) [<sup>[ENG]</sup>](https://en.wikipedia.org/wiki/Git)

 > W siększości są darmowe. Możesz np. użyć [konsolowego narzędzia](https://git-scm.com/) lub [oficjalnej aplikacji od GitHub'a](https://desktop.github.com/). Jeśli chcesz poćwiczyć programowanie trochę dłużej lub już programujesz, ale z GitHub'a za wieke nie korzystałeś, to osobiście polecam wybrać darmowy, open sourcowy i multiplatformowy program jakim jest [GitKraken](https://www.gitkraken.com/). Korzystam z niego od pewnego czasu i jestem naprawdę zadowolony z jego działania.

 * Aby pobrać przez Git'a należy: 

<hr>

 > Dla aplikacji konsolowej:
 * wejść do folderu w którym chcemy stworzyć plik projektu
 * Przytrzymując shift kliknąć prawym przyciskiem myszy na folder i wybrać cmd
 * Wpisać (adres można także wziąć z zielonego przycisku "Clone or download" po prawej stronie, nad plikami na githubie)
 > git clone https://github.com/Lubieerror/madziajapko-stream-notifier.git 

 <hr>

 > Dla aplikacji desktopowej:
 * File (lub "+" ) > Clone repo
 * Podać ścieżkę gdzie ma zostć zapisany plik oraz podać adres https://github.com/Lubieerror/madziajapko-stream-notifier.git

 <hr>

 > Wymagane:

 * Pobrać [Node.js](https://nodejs.org/en/) (najnowsze wydanie!)
 * Jeśli czujesz się na siłach możesz edytować pewne elementy programu (wdzięczny był bym też za wysłanie poprawek)
 * Wejść za pomocą linii poleceń do folderu z projektem
 * Wpisać:
 > npm install

 >npm start

## <p style="color: green"> Gotowe!
Możesz teraz cieszyć się funkcjonalnym powiadamiaczem! 

<hr>