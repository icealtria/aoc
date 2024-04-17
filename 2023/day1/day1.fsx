open System.IO

let lines = File.ReadAllLines("input") |> Array.map (fun line -> line.Trim())

let extractNumbers (line: string) =
    let first = line |> Seq.find System.Char.IsDigit
    let last = line |> Seq.rev |> Seq.find System.Char.IsDigit
    int (string first + string last)

let sumOfNumbers = lines |> Array.map extractNumbers |> Array.sum

printfn "%d" sumOfNumbers
